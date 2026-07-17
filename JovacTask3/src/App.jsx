import React, { useState } from 'react';

const INITIAL_TASKS = [
  { id: 1, text: 'React Assignment Complete', status: 'Completed', priority: 'High' },
  { id: 2, text: 'Clean up workspace', status: 'Pending', priority: 'Low' },
  { id: 3, text: 'Revise Javascript ES6 features', status: 'In Progress', priority: 'Medium' },
  { id: 4, text: 'Prepare database schema', status: 'Pending', priority: 'High' },
  { id: 5, text: 'Design User Flow chart', status: 'Completed', priority: 'Medium' }
];

export default function App() {
  const [tasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff4a4a';
      case 'Medium': return '#ffcc00';
      case 'Low': return '#00ffcc';
      default: return '#ffffff';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'Completed': return 'rgba(0, 255, 204, 0.15)';
      case 'In Progress': return 'rgba(255, 204, 0, 0.15)';
      case 'Pending': return 'rgba(255, 74, 74, 0.15)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#00ffcc';
      case 'In Progress': return '#ffcc00';
      case 'Pending': return '#ff4a4a';
      default: return '#ffffff';
    }
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Filterable Task List</h2>

        <div style={styles.filterContainer}>
          {['All', 'Pending', 'In Progress', 'Completed'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              style={{
                ...styles.filterButton,
                backgroundColor: filter === category ? '#00ffcc' : '#1e1e24',
                color: filter === category ? '#121214' : '#e1e1e6',
                border: filter === category ? '1px solid #00ffcc' : '1px solid #29292e'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={styles.taskList}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                style={{
                  ...styles.taskItem,
                  borderLeft: `5px solid ${getPriorityColor(task.priority)}`
                }}
              >
                <div style={styles.taskContent}>
                  <span style={styles.taskText}>{task.text}</span>
                  <div style={styles.badgeContainer}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: getPriorityColor(task.priority),
                      border: `1px solid ${getPriorityColor(task.priority)}`
                    }}>
                      {task.priority}
                    </span>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: getStatusBg(task.status),
                      color: getStatusColor(task.status),
                    }}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.emptyMessage}>No tasks in this category!</div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  bodyWrapper: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#121214',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  container: {
    backgroundColor: '#1e1e24',
    padding: '25px',
    borderRadius: '8px',
    border: '1px solid #29292e',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
  },
  title: {
    margin: '0 0 20px 0',
    color: '#00ffcc',
    fontSize: '24px',
    textAlign: 'center'
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    outline: 'none'
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  taskItem: {
    backgroundColor: '#29292e',
    padding: '15px',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
  },
  taskContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
  },
  taskText: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '500',
    flex: 1
  },
  badgeContainer: {
    display: 'flex',
    gap: '8px'
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#7c7c8a',
    fontStyle: 'italic',
    padding: '20px'
  }
};