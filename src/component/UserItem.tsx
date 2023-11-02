import React from 'react';

type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
};

interface UserItemProps {
    user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    return (
        <div className='user_item' key={user.id}>
            <img className='avatar' src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <div className='oswald txt_id'>{user.id}</div>
            <div className='oswald txt_email'>{user.email}</div>
            <div className='oswald txt_name'>{`${user.first_name} ${user.last_name}`}</div>
        </div>
    );
}

export default UserItem;