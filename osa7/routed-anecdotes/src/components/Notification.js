function Notification({ text }) {
  const notificationStyle = {
    padding: 5,
    borderStyle: 'dashed',
    width: 'fit-content',
  }
  if (text === '') {
    return <div />
  }
  return (
    <div style={notificationStyle}>
      {text}
    </div>
  );
}

export default Notification;
