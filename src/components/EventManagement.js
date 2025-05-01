import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary 
} from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: ''
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsList = [];
      querySnapshot.forEach((doc) => {
        eventsList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  // Add new event
  const handleAddEvent = async () => {
    try {
      await addDoc(collection(db, 'events'), newEvent);
      setOpen(false);
      // Refresh events list
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsList = [];
      querySnapshot.forEach((doc) => {
        eventsList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsList);
    } catch (error) {
      console.error("
} 