import React from "react";
import Button from "react-bootstrap/Button";
export default function ProfileForm({
    isLoading,
    userInfo,
    onChangeData,
    onChangeImage,
    handleSubmit,
}) {
    return (
        <form action='#'>
            <input
                type='text'
                value={userInfo?.fullname || ""}
                onChange={onChangeData("fullname")}
                className='form-control'
                placeholder='Tên ...'
                required
            />
            <select
                value={userInfo?.gender || ""}
                onChange={onChangeData("gender")}
                className='form-control'
            >
                <option value>Giới tính</option>
                <option value='nam'>Nam</option>
                <option value='nu'>Nữ</option>
            </select>
            <input
                type='file'
                onChange={onChangeImage}
                name='avatar'
                placeholder='Ảnh đại diện'
                className='form-control'
                id='input_file'
            />
            <textarea
                className='form-control'
                value={userInfo?.description || ""}
                onChange={onChangeData("description")}
                cols={30}
                rows={5}
                placeholder='Mô tả ngắn ...'
            />
            <div className='ass1-login__send justify-content-center'>
                <Button
                    type='submit'
                    disabled={isLoading}
                    onClick={!isLoading ? handleSubmit : null}
                >
                    <span> {isLoading ? "Loading…" : "Cập nhật"}</span>
                </Button>
            </div>
        </form>
    );
}
