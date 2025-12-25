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


const messages = [
  {
    text: "Hi I'm the creator. Leave a word ^^",
    user: "axlothecook",
    added: 'Dec 25, 05:03 AM'
  },
  {
    text: "my kappachungus life...",
    user: "Big Chungus",
    added: 'Dec 25, 05:10 AM'
  },
  {
    text: "Do you know the way?",
    user: "Uganda Knuckles",
    added: 'Dec 25, 05:12 AM'
  },
  {
    text: "67 >w<",
    user: "Shrek",
    added: 'Dec 25, 05:20 AM'
  },
  {
    text: "hop on deadlock",
    user: "Wii Sports Matt",
    added: 'Dec 25, 05:33 AM'
  },
  {
    text: "I'm never gonna give you up",
    user: "Rick Astley",
    added: 'Dec 25, 05:46 AM'
  }
];

export {
  warning,
  messages,
  reformatDate
};