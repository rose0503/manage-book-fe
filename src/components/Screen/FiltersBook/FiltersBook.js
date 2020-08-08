import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import {Form, Input } from 'antd';

FiltersBook.propTypes = {
    onSubmit: PropTypes.func
};

FiltersBook.defaultProps={
    onSubmit : null
}

const { Search } = Input;


function FiltersBook(props) {
    const {onSubmit} = props
    const [searchBook, setSearchBook] = useState('')
    const typingTimeoutRef = useRef(null)

    const handleSearchBookChange = (e)=>{
        var value = e.target.value
        setSearchBook(value)
    
        if(!onSubmit) return;

        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(()=>{
            const inputSearch = {
                searchbook: value
            }
            onSubmit(inputSearch)
        },300)
    }

    return (
        <div className="search-book">
            <Form>
            <Input.Search placeholder="Nhập sách cần tìm" value={searchBook} 
                onChange={handleSearchBookChange}  />

            </Form>    
        </div>
    );
}

export default FiltersBook;