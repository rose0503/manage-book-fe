import React from 'react';
import PropTypes from 'prop-types';
import {Button } from 'antd'
import '../../../App.css'

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
    onPageChagne : null,
}

function Pagination(props) {
    const {pagination, onPageChagne} = props
    const {_page, _limit, _totalRow} = pagination
    const totalPages = Math.ceil(_totalRow / _limit) 
    const handlePageChange = (newPage) =>{
        if(onPageChagne){
            onPageChagne(newPage);
        }  
    }
    return (
        <div className='pagination'>
            <Button  
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}    
            >
                Prev
            </Button >
            <Button  
                disabled={_page >= totalPages}
                onClick={() => handlePageChange(_page + 1)}    
            >
                Next
            </Button >
        </div>
    );
}

export default Pagination;