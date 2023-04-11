// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }

  function createEmployeeRecords(arr) {
    return arr.map(emp => createEmployeeRecord(emp));
  }

  function createTimeInEvent(emp, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    emp.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
    return emp;
  }

  function createTimeOutEvent(emp, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    emp.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
    return emp;
  }

  function hoursWorkedOnDate(emp, date) {
    const timeIn = emp.timeInEvents.find(event => event.date === date);
    const timeOut = emp.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
  }

  function wagesEarnedOnDate(emp, date) {
    const hoursWorked = hoursWorkedOnDate(emp, date);
    const payOwed = hoursWorked * emp.payPerHour;
    return payOwed;
  }

  function allWagesFor(emp) {
    const datesWorked = emp.timeInEvents.map(event => event.date);
    const wages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(emp, date);
    }, 0);
    return wages;
  }

  function calculatePayroll(employees) {
    const totalWages = employees.reduce((total, emp) => {
      return total + allWagesFor(emp);
    }, 0);
    return totalWages;
  }