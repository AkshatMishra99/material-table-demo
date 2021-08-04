/* eslint-disable prettier/prettier */
/* eslint-disable react/no-multi-comp */
import React, { forwardRef, useEffect, useState } from 'react';
import faker from 'faker';
// import { MailOutlineRounded } from '@material-ui/icons';
import MaterialTable from 'material-table';
import styled from 'styled-components';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import { Paper } from '@material-ui/core';
const Container = styled.div`
  margin: 40px auto;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  margin: 10px 30px 10px;
  font-weight: 800;
  font-size: 24px;
`;
const MaterialTableDemo = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const tempData = Array(10)
        .fill()
        .map((item, index) => ({
          id: index,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          city: faker.address.city(),
          //   birthDate: faker.date.past(),
        }));
      // console.log(tempData);
      setData([...tempData]);
    };
    fetchData();
    return () => {
      // console.log('exiting...');
    };
  }, []);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => (
      <DeleteOutline {...props} ref={ref} style={{ color: 'red' }} />
    )),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  // console.table(data);
  const columns = [
    { title: 'ID', field: 'id', hidden: true },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Phone', field: 'phone' },
    { title: 'City', field: 'city' },
    // { title: 'DoB', field: 'birthDate' },
  ];
  const isValidData = tempData => {
    const { firstName, lastName, phone, city } = tempData;
    if (
      !firstName ||
      firstName === '' ||
      !lastName ||
      lastName === '' ||
      !phone ||
      phone === '' ||
      !city ||
      city === ''
    ) {
      return false;
    }
    return true;
  };
  return (
    <Container>
      {data && data.length > 0 && (
        <MaterialTable
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (isValidData(newData)) {
                    setData([...data, newData]);
                    resolve();
                  } else reject();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (isValidData(newData)) {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve();
                  } else reject();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
          components={{
            Container: p => <Paper {...p} />,
            Header: p => (
              <Header {...p} style={{ display: 'block', color: 'red' }}>
                Demo
              </Header>
            ),
          }}
          icons={tableIcons}
          columns={columns}
          data={data}
          title=""
        />
      )}
    </Container>
  );
};

export default MaterialTableDemo;
