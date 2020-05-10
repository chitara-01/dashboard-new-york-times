import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const columns = [
  { id: 'published_date', label: 'Published Date', minWidth: 170 },
  { id: 'headline', label: 'Headline', minWidth: 100 },
  {
    id: 'summary',
    label: 'Summary',
    minWidth: 170,
    maxWidth: 500,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'url',
    label: 'URL',
    minWidth: 170,
    maxWidth: 500,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'source',
    label: 'Source',
    minWidth: 170,
    maxWidth: 500,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

function createData(published_date, headline, summary, url, source) {
  return { published_date, headline, summary, url, source };
}

var rows = [];

const useStyles = makeStyles({
  root: {
    width: '90%',
  },
  container: {
    maxHeight: '100%',
  },
});

var currentKeyword='';
export default  function StickyHeadTable(args) {
  
  const classes = useStyles();
  const [setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  
  const handleChangePage = async (event, newPage) => {
    newPage--;
    //update rows variable
    let response = await axios({
      method: 'get',
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq='+args.searchkeyword+'&facet=true&begin_year=2011&api-key=xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei&sort=newest&page='+newPage+'&fl=web_url&fl=pub_date&fl=headline&fl=abstract&fl=source'
    });
    var data = response.data.response.docs;
    rows=[];
    for(var i=0;i<data.length;i++){
      var d = createData(data[i].pub_date.split('T')[0],data[i].headline.main,data[i].abstract.substring(0,90)+"...",<a href={data[i].web_url} target="_blank">Go to article</a>,data[i].source);
      rows.push(d);   
    }
    setPage(newPage);
  };
  if(rows.length===0 || currentKeyword!==args.searchkeyword){
    currentKeyword=args.searchkeyword;
    rows= args.defaultRows;
  }
  
  return (
    <Paper className={classes.root} style={{width:'96%',marginTop:"2%",marginLeft:'3.5%',height:'100%'}}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0,rowsPerPage).map((row) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={100} variant="outlined" shape="rounded" onChange={handleChangePage} style={{marginTop:'1%'}}/>
    </Paper>
  );
}
