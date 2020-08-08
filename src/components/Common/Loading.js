import { Spin } from 'antd';
import React from 'react';
import '../../App.css'

function Loading() {
    return (
        <>
        <Spin className="loading" tip="Loading..." />
        </>
    );
}

export default Loading;