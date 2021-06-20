import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PATHS } from "../../constants";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function HeaderSearch() {
    const history = useHistory();
    const [querySearch, setQuerySearch] = useState("");

    const onChangeSearch = (e) => {
        setQuerySearch(e.target.value);
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        history.push(`${PATHS.SEARCH_RESULT}?q=${querySearch}`);
    };
    return (
        <div className='ass1-header__search'>
            <form action='#' onSubmit={onSubmitSearch}>
                <label>
                    <input
                        value={querySearch}
                        onChange={onChangeSearch}
                        type='search'
                        name='search-text'
                        className='form-control'
                        placeholder='Nhập từ khóa ...'
                    />
                    <i>
                        <FontAwesomeIcon icon={faSearch} />
                    </i>
                </label>
            </form>
        </div>
    );
}
