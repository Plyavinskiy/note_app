import * as ICONS from './svgs.js';

export const icons = ICONS;

export const categories = {
  "Idea" : icons.IDEA_ICON,
  "Quote": icons.QUOTE_ICON,
  "Task": icons.TASK_ICON,
  "Random Thought": icons.MIND_ICON
}

export let notes = [
  {
    id: "VyrwMPSvLo",
    name: "Shopping list",
    created: new Date("2021, 04, 20"),
    category: "Task",
    content: "Tomatoes, bread",
    dates: "",
    archived: false
  },
  {
    id: "auOl79pkiJ",
    name: "The theory of evolution",
    created: new Date("2021, 04, 27"),
    category: "Random Thought",
    content: "The evolution...",
    dates: "",
    archived: false
  },
  {
    id: "mp7tbNr0pm",
    name: "New Feature",
    created: new Date("2021, 05, 05"),
    category: "Idea",
    content: "Implement new feature...",
    dates: "3/5/2021, 5/5/2021",
    archived: false
  },
  {
    id: "TjjPjkJ1CT",
    name: "William Gaddis",
    created: new Date("2021, 05, 07"),
    category: "Quote",
    content: "Power doesn't...",
    dates: "",
    archived: false
  },
  {
    id: "KQwHVYgu5S",
    name: "Books",
    created: new Date("2021, 05, 15"),
    category: "Task",
    content: "The Lean Startup",
    dates: "",
    archived: false
  },
  {
    id: "mDr8djQEH5",
    name: "Dentist",
    created: new Date(),
    category: "Task",
    content: "I’m gonna have...",
    dates: "3/5/2021, 5/5/2021",
    archived: true
  },
  {
    id: "8632XlPtE2",
    name: "Internship",
    created: new Date(),
    category: "Task",
    content: "React | Node.js Internship",
    dates: "02/05/2022",
    archived: true
  }
]
