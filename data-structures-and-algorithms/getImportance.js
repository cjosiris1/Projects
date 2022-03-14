/*
You have a data structure of employee information, which includes the employee's unique id, their importance value, and their direct subordinates' id.

You are given an array of employees employees where:

employees[i].id is the ID of the ith employee.
employees[i].importance is the importance value of the ith employee.
employees[i].subordinates is a list of the IDs of the subordinates of the ith employee.
Given an integer id that represents the ID of an employee, return the total importance value of this employee and all their subordinates.

Example 1:
Input: employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1
Output: 11
Explanation: Employee 1 has importance value 5, and he has two direct subordinates: employee 2 and employee 3.
They both have importance value 3.
So the total importance value of employee 1 is 5 + 3 + 3 = 11.

Example 2:
Input: employees = [[1,2,[5]],[5,-3,[]]], id = 5
Output: -3

Constraints:
1 <= employees.length <= 2000
1 <= employees[i].id <= 2000
All employees[i].id are unique.
-100 <= employees[i].importance <= 100
One employee has at most one direct leader and may have several subordinates.
id is guaranteed to be a valid employee id.
 */
/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function(employees, id) {

    // initialize total importantce value
    let totalImportance = 0;

    // initialize helper to find employee by id
    const findEmployee = function(id){
        let employee = null;
        employees.forEach(e => {
            if(e.id == id){
                employee = e;
                return;
            }
        });

        return employee;
    };
    let currentEmployee = findEmployee(id);

    // calculate first / current employee's importance before the subordinates
    totalImportance += currentEmployee && currentEmployee.importance ? currentEmployee.importance : 0;

    // get employee suboordinates and add them to a list
    let moreSubs = [...currentEmployee.subordinates];

    // initialize current subordinate id and subordinate object variables
    let curSubId;
    let subordinate;

    // traverse through all suboordinates till we have none to tally
    while(moreSubs.length > 0){

        // get current subid from list
        curSubId = moreSubs.pop();

        // find the matching subordinate
        subordinate = findEmployee(curSubId);

        // keep track of the subordinates subs
        moreSubs = [...moreSubs, ...subordinate.subordinates];

        // tally up the importance
        totalImportance += subordinate && subordinate.importance ? subordinate.importance : 0;
    }

    return totalImportance;
};