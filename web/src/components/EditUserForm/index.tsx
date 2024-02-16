import React, {useState} from 'react';
import {User} from "../../api/user";

export interface EditUserFormProps {
    user: User;
    onSave: (user: User) => void;
}

const EditUserForm = ({user, onSave}: EditUserFormProps) => {
    const [name, setName] = useState(user.name);
    const [avatarId, setAvatarId] = useState(user.avatarId);
    const [email, setEmail] = useState(user.email);
    const [phone, setphone] = useState(user.phone);
    const [telegram, setTelegram] = useState(user.telegram);
    const [cityId, setCityId] = useState(user.cityId);




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave({...user, name, avatarId});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            {/*<div>*/}
            {/*    <label>Email:</label>*/}
            {/*    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />*/}
            {/*</div>*/}
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditUserForm;
