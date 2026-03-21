import ReactGA from "react-ga4";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, setDoc, doc, updateDoc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-NHG4FX418K";

// Session management
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("avvocapp_session_id");
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("avvocapp_session_id", sessionId);
  }
  return sessionId;
};

const getVisitorId = () => {
  let visitorId = localStorage.getItem("avvocapp_visitor_id");
  if (!visitorId) {
    visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("avvocapp_visitor_id", visitorId);
  }
  return visitorId;
};

export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log("Google Analytics Initialized with ID:", GA_MEASUREMENT_ID);
  } else {
    console.warn("Google Analytics Measurement ID not found. Set VITE_GA_MEASUREMENT_ID in your environment.");
  }

  // Start Firestore session
  startFirestoreSession();
};

const startFirestoreSession = async () => {
  const sessionId = getSessionId();
  const visitorId = getVisitorId();
  const sessionRef = doc(db, "analytics_sessions", sessionId);
  
  try {
    const sessionDoc = await getDoc(sessionRef);
    const isReturningUser = localStorage.getItem("avvocapp_returning_user") === "true";
    
    if (!sessionDoc.exists()) {
      // Document doesn't exist at all
      await setDoc(sessionRef, {
        id: sessionId,
        visitorId,
        startTime: serverTimestamp(),
        lastActive: serverTimestamp(),
        userAgent: navigator.userAgent,
        isNewUser: !isReturningUser,
      });
      if (!isReturningUser) localStorage.setItem("avvocapp_returning_user", "true");
    } else {
      // Document exists (might be a partial from trackPageView)
      const data = sessionDoc.data();
      const updateData: any = {
        lastActive: serverTimestamp()
      };
      
      // If it's a partial document (missing metadata), add it
      if (!data.startTime) {
        updateData.startTime = serverTimestamp();
        updateData.id = sessionId;
        updateData.visitorId = visitorId;
        updateData.userAgent = navigator.userAgent;
        updateData.isNewUser = !isReturningUser;
        if (!isReturningUser) localStorage.setItem("avvocapp_returning_user", "true");
      }
      
      await updateDoc(sessionRef, updateData);
    }
  } catch (err) {
    console.error("Error starting analytics session:", err);
  }
};

export const trackPageView = async (path: string) => {
  // Google Analytics
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: "pageview", page: path });
  }

  // Firestore
  try {
    const sessionId = getSessionId();
    await addDoc(collection(db, "analytics_events"), {
      type: "pageview",
      path,
      timestamp: serverTimestamp(),
      sessionId
    });
    
    // Update session heartbeat
    const sessionRef = doc(db, "analytics_sessions", sessionId);
    await setDoc(sessionRef, { lastActive: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.error("Error tracking page view:", err);
  }
};

export const trackEvent = async (category: string, action: string, label?: string) => {
  // Google Analytics
  if (GA_MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }

  // Firestore
  try {
    const sessionId = getSessionId();
    await addDoc(collection(db, "analytics_events"), {
      type: "click",
      category,
      action,
      label,
      timestamp: serverTimestamp(),
      sessionId
    });
    
    // Update session heartbeat
    const sessionRef = doc(db, "analytics_sessions", sessionId);
    await setDoc(sessionRef, { lastActive: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.error("Error tracking event:", err);
  }
};

export const getAnalyticsSummary = async () => {
  try {
    // For simplicity in this demo, we'll aggregate on the fly
    // In a real app, you'd use a Cloud Function to update a summary doc
    const eventsSnap = await getDocs(collection(db, "analytics_events"));
    const sessionsSnap = await getDocs(collection(db, "analytics_sessions"));
    
    const events = eventsSnap.docs.map(d => d.data());
    const sessions = sessionsSnap.docs.map(d => d.data());
    
    const totalVisits = events.filter(e => e.type === "pageview").length;
    const uniqueVisitors = new Set(sessions.map(s => s.visitorId)).size;
    const demoClicks = events.filter(e => e.type === "click" && e.action === "demo_click").length;
    
    // Calculate avg session duration
    let totalDuration = 0;
    sessions.forEach(s => {
      if (s.startTime && s.lastActive) {
        const start = s.startTime.toDate ? s.startTime.toDate().getTime() : new Date(s.startTime).getTime();
        const last = s.lastActive.toDate ? s.lastActive.toDate().getTime() : new Date(s.lastActive).getTime();
        totalDuration += (last - start);
      }
    });
    
    const avgDurationMs = sessions.length > 0 ? totalDuration / sessions.length : 0;
    const avgDurationMin = Math.floor(avgDurationMs / 60000);
    const avgDurationSec = Math.floor((avgDurationMs % 60000) / 1000);

    return {
      totalVisits: totalVisits.toLocaleString(),
      uniqueVisitors: uniqueVisitors.toLocaleString(),
      avgSessionDuration: `${avgDurationMin}m ${avgDurationSec}s`,
      demoClicks: demoClicks.toLocaleString()
    };
  } catch (err) {
    console.error("Error fetching analytics summary:", err);
    return null;
  }
};
