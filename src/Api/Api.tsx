import * as network from './Network';

// get employee details
export const getAllEmployees = () => network.get('/employess/employees')

// add employeee
export const addEmployee = (employeeDetail: Object) => network.post('/employess/employees', employeeDetail)

