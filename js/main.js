'use strict';

(() => {

  const key = 'students';
  const filterStudentName = document.getElementById('filter-student-name');
  const filterFaculty = document.getElementById('filter-faculty');
  const filterStartEducation = document.getElementById('filter-start-education');
  const filterGraduation = document.getElementById('filter-graduation');
  let students = createStudentsArray();

  document.addEventListener('DOMContentLoaded', () => {
    filterStudentName.addEventListener('input', filter);
    filterFaculty.addEventListener('input', filter);
    filterStartEducation.addEventListener('input', filter);
    filterGraduation.addEventListener('input', filter);
    createTable(students);
    sort();
    addStudent();
  });

  // Создание массива студентов
  function createStudentsArray() {
    const studentsArray = [
      {
        surname: 'Симонов',
        name: 'Николай',
        middleName: 'Андреевич',
        birthDate: new Date(1985, 3, 4),
        startEducation: 2017,
        faculty: 'актерский'
      },
      {
        surname: 'Иванов',
        name: 'Иван',
        middleName: 'Иванович',
        birthDate: new Date(1990, 7, 15),
        startEducation: 2018,
        faculty: 'экономический'
      },
      {
        surname: 'Петров',
        name: 'Василий',
        middleName: 'Иванович',
        birthDate: new Date(1993, 5, 10),
        startEducation: 2019,
        faculty: 'геологический'
      },
      {
        surname: 'Сергеев',
        name: 'Сергей',
        middleName: 'Сергеевич',
        birthDate: new Date(1989, 9, 23),
        startEducation: 2020,
        faculty: 'филологический'
      },
      {
        surname: 'Сидоров',
        name: 'Виктор',
        middleName: 'Петрович',
        birthDate: new Date(1987, 1, 2),
        startEducation: 2021,
        faculty: 'психологический'
      },
      {
        surname: 'Васильев',
        name: 'Василий',
        middleName: 'Васильевич',
        birthDate: new Date(1982, 7, 6),
        startEducation: 2016,
        faculty: 'психологический'
      }
    ];

    const studentsStorage = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : studentsArray;

    // Получая json преобразуем строку с датой в объект date
    for (let i = 0; i < studentsStorage.length; i++) {
      if (typeof studentsStorage[i].birthDate === 'string') {
        studentsStorage[i].birthDate = new Date(studentsStorage[i].birthDate);
      }
    }

    return studentsStorage;
  }

  // Изменение таблицы
  function createTable(students) {

    const tableBody = document.getElementById('students-list');

    while (tableBody.rows[0]) {
      tableBody.deleteRow(0);
    }

    for (const student of students) {
      const tableRow = document.createElement('tr');
      tableBody.append(tableRow);

      const currentStudentName = document.createElement('td');
      tableRow.append(currentStudentName);
      const currentFaculty = document.createElement('td');
      tableRow.append(currentFaculty);
      const currentBirthDate = document.createElement('td');
      tableRow.append(currentBirthDate);
      const currentStartEducation = document.createElement('td');
      tableRow.append(currentStartEducation);

      const fullStudentName = student.surname + ' ' + student.name + ' ' + student.middleName;
      currentStudentName.textContent = fullStudentName;
      currentFaculty.textContent = student.faculty;

      const date = student.birthDate.getDate();
      const month = createMonth(student.birthDate);
      const year = student.birthDate.getFullYear();
      currentBirthDate.textContent = date + '.' + month + '.' + year;

      // Вычисление курса, на котором учится студент
      const currentDate = createCurrentDate();
      let course;

      // Вариант 1
      // if ((currentDate.year - student.startEducation) === 4 && currentDate.month > 8 || (currentDate.year - student.startEducation) > 4) {
      //   course = 'Закончил';
      // } else if ((currentDate.year - student.startEducation) === 4 && currentDate.month < 8 || (currentDate.year - student.startEducation) < 4) {
      //   course = `(${currentDate.year - student.startEducation} курс)`;
      // }
      // currentStartEducation.textContent = `${student.startEducation} - ${student.startEducation + 4} ${course}`;

      // Вариант 2
      if ((currentDate.year - student.startEducation) === 0) {
        course = '(1 курс)';
      } else if ((currentDate.year - student.startEducation) === 1) {
        course = '(2 курс)';
      } else if ((currentDate.year - student.startEducation) === 2) {
        course = '(3 курс)';
      } else if ((currentDate.year - student.startEducation) === 3) {
        course = '(4 курс)';
      } else {
        course = 'Закончил';
      }
      currentStartEducation.textContent = `${student.startEducation} - ${student.startEducation + 4} ${course}`;
    }
  }

  // Создание текущей даты
  function createCurrentDate() {
    const currentDate = new Date();

    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    return {
      date: date,
      month: month,
      year: year
    }
  }

  // Получение численного значения месяца
  function createMonth(fullDate) {
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',];
    return month[fullDate.getMonth()];
  }

  // Добавление студента
  function addStudent() {
    const addStudentName = document.getElementById('add-student-name');
    const studentNameMessage = document.getElementById('student-name-message');
    const addFaculty = document.getElementById('add-faculty');
    const facultyMessage = document.getElementById('faculty-message');
    const addBirthDate = document.getElementById('add-birth-date');
    const birthDateMessage = document.getElementById('birth-date-message');
    const addStartEducation = document.getElementById('add-start-education');
    const startEducationMessage = document.getElementById('start-education-message');

    const addButton = document.getElementById('add-button');
    const currentDate = createCurrentDate();
    const currentYear = currentDate.year;

    addButton.addEventListener('click', e => {
      e.preventDefault();
      const newStudent = {};

      const fullNewStudentName = addStudentName.value.split(' ');

      if (!addStudentName.value.trim() || fullNewStudentName.length < 3) {
        studentNameMessage.classList.add('attention');
        studentNameMessage.textContent = 'Проверьте правильность ФИО';
      } else {
        if (studentNameMessage.classList.contains('attention')) {
          studentNameMessage.classList.remove('attention');
          studentNameMessage.textContent = '';
        }
        newStudent.surname = fullNewStudentName[0];
        newStudent.name = fullNewStudentName[1];
        newStudent.middleName = fullNewStudentName[2];
      }

      if (!addFaculty.value.trim()) {
        facultyMessage.classList.add('attention');
        facultyMessage.textContent = 'Введите факультет';
      } else {
        if (facultyMessage.classList.contains('attention')) {
          facultyMessage.classList.remove('attention');
          facultyMessage.textContent = '';
        }
        newStudent.faculty = addFaculty.value;
      }

      if (!addBirthDate.valueAsDate || addBirthDate.valueAsDate.getFullYear() < 1900) {
        birthDateMessage.classList.add('attention');
        birthDateMessage.textContent = 'Проверьте дату рождения';
      } else {
        if (birthDateMessage.classList.contains('attention')) {
          birthDateMessage.classList.remove('attention');
          birthDateMessage.textContent = '';
        }
        newStudent.birthDate = addBirthDate.valueAsDate;
      }

      if (!addStartEducation.value.trim() || parseInt(addStartEducation.value) < 2000 || parseInt(addStartEducation.value) > currentYear) {
        startEducationMessage.classList.add('attention');
        startEducationMessage.textContent = 'Введите год начала обучения, но не раньше 2000г';
      } else {
        if (startEducationMessage.classList.contains('attention')) {
          startEducationMessage.classList.remove('attention');
          startEducationMessage.textContent = '';
        }
        newStudent.startEducation = parseInt(addStartEducation.value);
      }

      if (newStudent.surname && newStudent.name && newStudent.middleName && newStudent.faculty && newStudent.birthDate && newStudent.startEducation) {
        students.push(newStudent);
        localStorage.setItem(key, JSON.stringify(students));
        addStudentName.value = addBirthDate.value = addStartEducation.value = addFaculty.value = null;

        createTable(students);
      }
    });
  }

  // Фильтрация
  function filter() {
    let result = students;

    if (filterStudentName.value) {
      result = result.filter(student => (student.surname + student.name + student.middleName).toLowerCase().includes(filterStudentName.value.toLowerCase()));
    }

    if (filterFaculty.value) {
      result = result.filter(student => student.faculty.toLowerCase().includes(filterFaculty.value.toLowerCase()));
    }

    if (filterStartEducation.value) {
      result = result.filter(student => student.startEducation === parseInt(filterStartEducation.value));
    }
    if (filterGraduation.value) {
      result = result.filter(student => (student.startEducation + 4) === parseInt(filterGraduation.value));
    }

    // Если поля поиска все пустые, рисуем таблицу по исходному массиву, если нет, то по отфильтрованному
    if (!filterStudentName.value && !filterFaculty.value && !filterStartEducation.value && !filterGraduation.value) {
      createTable(students);
    } else {
      createTable(result);
    }
  }

  // Сортировка
  function sort() {
    const sortByName = document.getElementById('sort-by-name');
    sortByName.addEventListener('click', () => {
      const result = students.sort((a, b) => {
        const nameA = (a.surname + a.name + a.middleName).toLowerCase();
        const nameB = (b.surname + b.name + b.middleName).toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      createTable(result);
    });

    const sortByFaculty = document.getElementById('sort-by-faculty');
    sortByFaculty.addEventListener('click', () => {
      const result = students.sort((a, b) => {
        if (a.faculty.toLowerCase() < b.faculty.toLowerCase()) return -1;
        if (a.faculty.toLowerCase() > b.faculty.toLowerCase()) return 1;
        return 0;
      });
      createTable(result);
    });

    const sortByBirthDate = document.getElementById('sort-by-birth-date');
    sortByBirthDate.addEventListener('click', () => {
      const result = students.sort((a, b) => {
        return a.birthDate - b.birthDate;
      });
      createTable(result);
    });

    const sortByStartEducation = document.getElementById('sort-by-start-education');
    sortByStartEducation.addEventListener('click', () => {
      const result = students.sort((a, b) => {
        return a.startEducation - b.startEducation;
      });
      createTable(result);
    });
  }
})();
