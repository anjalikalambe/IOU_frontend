import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseFavourModal from "../components/CloseFavourModal";
import { TablePagination } from "@material-ui/core";
import Loader from "../components/UI/Loader";
import { useStore } from "../stores/helpers/UseStore";
import { observer } from "mobx-react-lite";

function GiveSomeone() {
  const [showResolveModal, setResolveShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { earned } = useStore();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchRewards = async () => {
    await earned.fetchFavours();
  }

  const resolve = (row) => {
    setResolveShowModal(true);
    setSelectedRow(row);
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  useEffect(() => {
    setLoading(earned.loading);
  }, [earned.loading])

  return (
    <div id="give-someone">
      <div className="justify-between" style={{ marginBottom: "30px" }}>
        <h1>Claim Rewards</h1>
      </div>
      {loading && <Loader />}
      {!earned.rows.length && !loading ? (
        <div className="empty-state">
          <img src="/empty.png" alt="" className="empty-state__img"></img>
          <h2>Nobody owes you any favours</h2>
        </div>
      ) : !loading && (
        <>
          <div style={{ marginBottom: "15px" }}>
            <h3>Favours owed by others</h3>
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Open Image</TableCell>
                  <TableCell>Close Image</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {earned.rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                  <TableRow key={row.owed_by + index}>
                    <TableCell>{row.owed_by}</TableCell>
                    <TableCell>{row.item}</TableCell>
                    <TableCell className="img-wrapper">
                      <div className="align-center">
                        {row.openImgURL ? (
                            <img
                              className="img-favour"
                              src={row.openImgURL}
                              alt=""
                              onClick={()=> window.open(row.openImgURL, "_blank")}
                            />
                        ) : (
                          "Not provided"
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="img-wrapper">
                      <div className="align-center">
                        {row.closeImgURL ? (
                            <img
                              className="img-favour"
                              src={row.closeImgURL}
                              alt=""
                              onClick={()=> window.open(row.closeImgURL, "_blank")}
                            />
                        ) : (
                          "Not provided"
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="align-center">
                        {row.completed ||
                        (row.openImgURL && row.closeImgURL) ? (
                          <>
                            <img className="img-favour" alt="" src={row.status} />
                            <CheckCircleIcon
                              style={{ color: "green", fontSize: "30px" }}
                            />
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => resolve(row)}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
            {earned.rows.length > 10 && (
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={earned.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
        </>
      )}

      <CloseFavourModal
        selectedRow={selectedRow}
        onClose={() => {
          setResolveShowModal(false);
          setTimeout(() => {
            setSelectedRow({});
          }, 500);
        }}
        isOpen={showResolveModal}
        resolveFavour={fetchRewards}
      />
    </div>
  );
}

export default observer(GiveSomeone);