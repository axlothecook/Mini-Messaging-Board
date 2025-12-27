import { format } from "date-fns";

let warning = {
  message: null,
  warning: false,
  repeatedLogInError: false,
  notSignedInError: false
};

const reformatDate = (date) => {
  return format(date, 'MMM dd, hh:mm a');
};

let counter = 0;

const messages = [
  {
    text: "Hi I'm the creator. Leave a word ^^",
    user: {
      id: 0,
      name: "axlothecook"
    },
    added: 'Dec 25, 05:03 AM'
  },
];

export {
  warning,
  messages,
  counter,
  reformatDate
};