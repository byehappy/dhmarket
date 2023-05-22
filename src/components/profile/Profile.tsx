import { Container, Info, EditButton, EditForm } from "./Profile.style";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AuthService from "../../services/AuthServices";
import { IUser } from "../../interfaces/BasicInterface";

const Profile = () => {
    const { profile, updateProfile } = AuthService();
    const { id } = useParams();
    const [info, setInfo] = useState<IUser | null>(null);
    const [editing, setEditing] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState<IUser | null>(null);

    const takeInfo = async () => {
        try {
            const response = await profile(id);
            setInfo(response.data);
            setUpdatedInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        takeInfo();
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
        setUpdatedInfo(info);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedInfo((prevState) => {
            if (!prevState) {
                return null;
            }
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!updatedInfo) {
                throw new Error("No data to update");
            }
            await updateProfile(id, updatedInfo);
            setInfo(updatedInfo);
            setEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    if (!info) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            {!editing ? (
                <Info>
                    <h2>Имя: {info.name}</h2>
                    <p>Email: {info.email}</p>
                    <p>Адрес: {info.address}</p>
                    <p>Номер телефона: {info.phone_number}</p>
                    <EditButton onClick={handleEdit}>Редактировать</EditButton>
                </Info>
            ) : (
                <EditForm onSubmit={handleSubmit}>
                    <label>
                        Имя:
                        <input
                            type="text"
                            name="name"
                            value={updatedInfo?.name || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={updatedInfo?.email || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Адрес:
                        <input
                            type="text"
                            name="address"
                            value={updatedInfo?.address || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Номер телефона:
                        <input
                            type="text"
                            name="phone_number"
                            value={updatedInfo?.phone_number || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <div>
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={handleCancel}>
                            Отмена
                        </button>
                    </div>
                </EditForm>
            )}
        </Container>
    );
};

export default Profile;
