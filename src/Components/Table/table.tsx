import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import './table.css';
import { Button, PaginationItem } from 'reactstrap'
import { getAllEmployees } from '../../Api/Api';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Spinner from '../../UI/Spinner/Spinner';
import Modal from '../../UI/Modal/Modal';
import AddEmployee from '../AddEmployee/addEmployee';

declare module 'react-table' {

    interface TableInstance<D extends object = {}>
        extends UsePaginationInstanceProps<D>,
        UseSortByInstanceProps<D> {
    }

    interface TableState<D extends object = {}>
        extends UsePaginationState<D>,
        UseSortByState<D> { }


    interface ColumnInstance<D extends object = {}>
        extends UseSortByColumnProps<D> { }

}


const EmployeeTable = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [forceRendering, setForceRendering] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        getAllEmployees()
            .then(res => {
                setIsLoading(false)
                type Row = { id: number; name: string; email: string; position: string }
                setData(res.map((row: Row) => {
                    return {
                        'id': row.id,
                        'name': row.name,
                        'email': row.email,
                        'position': row.position,
                    }
                }))
            })
            .catch(err => {
                setIsLoading(false)
                alert(err)
            })
    }, [forceRendering])

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email"
            },
            {
                Header: "Position",
                accessor: "position"
            },
        ], []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        state,
        setPageSize,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        useSortBy,
        usePagination
    )

    const { pageIndex, pageSize } = state

    const rerender = () => {
        setForceRendering(prevState => prevState + 1)
    }

    return (
        <div className='p-5'>
            <h1 className='d-flex justify-content-center mb-3'>Employee Details</h1>
            <Modal show={modalVisibility} ><AddEmployee rerender={rerender} modalClosed={() => setModalVisibility(false)} /></Modal>
            <BackDrop show={isLoading}><Spinner /></BackDrop>
            <div className='employeeTable'>
                <table {...getTableProps()} >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {column.isSorted ? (column.isSortedDesc ? <i className="fa fa-arrow-up"></i> : <i className="fa fa-arrow-down"></i>) : ''}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Button className='m-2' onClick={() => setModalVisibility(true)}><i className="fa fa-plus" aria-hidden="true"></i> New</Button>
            </div>
            <div className="pagination">
                <div className="rowPerPage p-2">
                    <span className='mr-2 fs-5'>Result per page:</span>
                    <PaginationItem onClick={() => setPageSize(5)} active={pageSize === 5}>5
                    </PaginationItem>|
                    <PaginationItem onClick={() => setPageSize(10)} active={pageSize === 10}>10
                    </PaginationItem>
                </div>

                <div className="p-2">
                    <Button className='paginationButton' onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Prev
                    </Button>
                    <Button className='pageIndex'>
                        {pageIndex + 1}
                    </Button>
                    <Button className='paginationButton' onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeTable;