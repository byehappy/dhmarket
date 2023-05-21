import { useSelector } from "react-redux";
import { Admin, Resource } from "react-admin";
import { Container} from "./AdminPanel.style";
import {UserList ,ProductList} from "../../admin/Lists";
import {Navigate} from "react-router-dom";
import simpleRestProvider from 'ra-data-simple-rest'
import {ProductCreate} from "../../admin/Create";
import {ProductEdit} from "../../admin/Edit";
const dataProvider = simpleRestProvider('http://localhost:3001/api',);

const AdminPanel = () => {
    const isAdmin = useSelector((state) => state);

    return (
        <Container>
                {isAdmin ? (
                    <Admin basename={'/admin'} dataProvider={dataProvider}>
                        <Resource name="customers" list={UserList} />
                        <Resource name="products" edit={ProductEdit} create={ProductCreate} list={ProductList}/>
                    </Admin>
                ) : (
                    <Navigate to="/" />
                )}
        </Container>
    );
};

export default AdminPanel;
