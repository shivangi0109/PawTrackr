import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

function PetReminders(props) {
  const { pet } = props;
  const [petReminders, setPetReminders] = useState([]);

  // Display Reminder Date in YYYY/MM/DD format
  // const reminderDate = new Date(completedReminder.date);
  // const formattedReminderDate = `${reminderDate.getFullYear()}/${(
  //   reminderDate.getMonth() + 1
  // )
  //   .toString()
  //   .padStart(2, '0')}/${reminderDate
  //     .getDate()
  //     .toString()
  //     .padStart(2, '0')} ${reminderDate
  //       .getHours()
  //       .toString()
  //       .padStart(2, '0')}:${reminderDate
  //         .getMinutes()
  //         .toString()
  //         .padStart(2, '0')}`;


  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/reminders/${pet.id}`)
      .then((res) => {
        console.log(res);
        setPetReminders(res.data)
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [pet]);

  return (
    <>
      <ListGroup>
        <ListGroup.Item><strong>Upcoming Reminders:</strong></ListGroup.Item>
        {
          petReminders.map((petreminder) => (
          <ListGroup.Item key={petreminder.id}>{petreminder.date} - {petreminder.title} -  {petreminder.comment}</ListGroup.Item>
        ))}
    </ListGroup>
    </>
  );
}

export default PetReminders;