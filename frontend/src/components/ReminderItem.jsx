import FormCheck from 'react-bootstrap/FormCheck';
import { useState } from 'react';
import axios from 'axios';

function ReminderItem(props) {
  const { reminder } = props;
  const [isDone, setIsDone] = useState(reminder.done);

  // Display Reminder Date in YYYY/MM/DD format
  const reminderDate = new Date(reminder.date);
  const formattedReminderDate = `${reminderDate.getFullYear()}/${(
    reminderDate.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${reminderDate
      .getDate()
      .toString()
      .padStart(2, '0')} ${reminderDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${reminderDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;

  const handleEdit = (reminderId) => {
    console.log('IsDONE', isDone);
    setIsDone(!isDone);
    axios
      .put(`http://localhost:8080/api/reminders/${reminderId}`, {
        done: isDone,
      })
      .then((response) => {
        // TODO: Remove console logs
        console.log(response.data);
        console.log(`Edited reminder ${reminderId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <td>{reminder.title}</td>
      <td>{formattedReminderDate}</td>
      <td>{reminder.comment}</td>
      <td>
        <FormCheck
          aria-label='option 1'
          checked={isDone}
          onClick={() => {
            handleEdit(reminder.id);
          }}
        />
      </td>
    </>
  );
}

export default ReminderItem;
