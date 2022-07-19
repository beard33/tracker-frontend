import React from 'react';
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


export default function SearchBar(props) {
    
    return (
        <React.Fragment>
            
             <div className={props.gruppo ? "searchBarGruppo" : "searchBar"}>
            <Form style={{ width: "100%" }}>
              <Form.Row className='searchForm'>
                <TextField
                  style={{ width: "90%" }}
                  type="search"
                  value={props.searchValue}
                  onChange={props.dynamicSearch}
                  label="Filtro"
                  placeholder={props.placeholder}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                </TextField>
              </Form.Row>
            </Form>
          </div>

        </React.Fragment>
    )
}