import React from 'react';
import {List, Datagrid, TextField, EmailField} from 'react-admin';

export const UserList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Identification"/>
            <TextField source="name"/>
            <TextField source="phone_number"/>
            <EmailField source="email"/>
            <TextField source="address"/>
        </Datagrid>
    </List>
);
export const ProductList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Identification"/>
            <TextField source="name"/>
            <TextField source="description"/>
            <EmailField source="price"/>
            <TextField source="quantity_in_stock"/>
            <TextField source="attributes"/>
            <TextField source="rating"/>
            <TextField source="votes"/>
        </Datagrid>
    </List>
);