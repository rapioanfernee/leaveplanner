import { genericSorter, dateSorter } from "../Sorter/Sorter";
import { Leaves, Months, Genders } from "../../default";

export const leaveLogColumn = [
  {
    title: "Leave Type",
    dataIndex: "leaveType",
    width: 100,
    sorter: (a, b) => genericSorter(a.leaveType, b.leaveType),
    sortDirections: ["descend", "ascend"],
    filters: Leaves,
    onFilter: (value, record) => record.leaveType.indexOf(value) === 0
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    width: 100,
    sorter: (a, b) => dateSorter(a.startDate, b.startDate),
    sortDirections: ["descend", "ascend"],
    filters: Months,
    onFilter: (value, record) => record.startDate.indexOf(value) === 0
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    width: 100,
    sorter: (a, b) => dateSorter(a.endDate, b.endDate),
    sortDirections: ["descend", "ascend"],
    filters: Months,
    onFilter: (value, record) => record.endDate.indexOf(value) === 0
  },
  {
    title: "Date Submitted",
    width: 100,
    dataIndex: "dateSubmitted",
    sorter: (a, b) => dateSorter(a.dateSubmitted, b.dateSubmitted),
    sortDirections: ["descend", "ascend"],
    filters: Months,
    onFilter: (value, record) => record.dateSubmitted.indexOf(value) === 0
  }
];

export const peopleColumn = [
  {
    title: "First Name",
    dataIndex: "firstName",
    width: 100,
    sorter: (a, b) => genericSorter(a.firstName, b.firstName),
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    width: 100,
    sorter: (a, b) => genericSorter(a.lastName, b.lastName),
    sortDirections: ["descend", "ascend"],
    filters: Leaves,
    onFilter: (value, record) => record.lastName.indexOf(value) === 0
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 100,
    sorter: (a, b) => genericSorter(a.email, b.email),
    sortDirections: ["descend", "ascend"],
    filters: Leaves,
    onFilter: (value, record) => record.email.indexOf(value) === 0
  },
  {
    title: "Job Position",
    dataIndex: "jobPosition",
    width: 100,
    sorter: (a, b) => genericSorter(a.jobPosition, b.jobPosition),
    sortDirections: ["descend", "ascend"],
    filters: Leaves,
    onFilter: (value, record) => record.jobPosition.indexOf(value) === 0
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    width: 100,
    sorter: (a, b) => dateSorter(a.birthday, b.birthday),
    sortDirections: ["descend", "ascend"],
    filters: Months,
    onFilter: (value, record) => record.birthday.indexOf(value) === 0
  },
  {
    title: "Gender",
    dataIndex: "gender",
    width: 100,
    sorter: (a, b) => genericSorter(a.gender, b.gender),
    sortDirections: ["descend", "ascend"],
    filters: Genders,
    onFilter: (value, record) => record.gender.indexOf(value) === 0
  }
];
