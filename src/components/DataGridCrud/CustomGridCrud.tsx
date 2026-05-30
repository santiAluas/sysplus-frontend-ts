import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridValidRowModel,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

export type CustomGridColumn<T extends GridValidRowModel> = GridColDef<T> & {
  editableCrud?: boolean;
};

interface CustomGridCrudProps<T extends GridValidRowModel & { id: GridRowId }> {
  title?: string;
  rows: T[];
  columns: CustomGridColumn<T>[];

  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;

  hideActions?: boolean;
  hideCreateButton?: boolean;
  hideEditButton?: boolean;
  hideDeleteButton?: boolean;

  createButtonText?: string;

  onCreate?: () => void;
  onSave?: (row: T) => Promise<T> | T;
  onDelete?: (id: GridRowId, row: T) => void;

  height?: number | string;
}

export function CustomGridCrud<T extends GridValidRowModel & { id: GridRowId }>({
  title = "Listado",
  rows,
  columns,
  canCreate = true,
  canEdit = true,
  canDelete = true,
  hideActions = false,
  hideCreateButton = false,
  hideEditButton = false,
  hideDeleteButton = false,
  createButtonText = "Crear",
  onCreate,
  onSave,
  onDelete,
  height = 520,
}: CustomGridCrudProps<T>) {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [editedRows, setEditedRows] = useState<Record<GridRowId, T>>({});

  const isRowEditing = (id: GridRowId) =>
    rowModesModel[id]?.mode === GridRowModes.Edit;

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const handleSaveClick = async (id: GridRowId) => {
    const originalRow = rows.find((x) => x.id === id);
    const updatedRow = editedRows[id] ?? originalRow;

    if (updatedRow && onSave) {
      await onSave(updatedRow);
    }

    setEditedRows((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleCancelClick = (id: GridRowId) => {
    setEditedRows((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const finalColumns: GridColDef<T>[] = [
    ...columns.map((column) => ({
      ...column,
      editable: false,
      renderCell: (params: any) => {
        const id = params.id;
        const editing = isRowEditing(id);
        const rowValue = editedRows[id]?.[params.field] ?? params.value ?? "";

        if (editing && column.editableCrud) {
          return (
            <TextField
              size="small"
              fullWidth
              value={rowValue}
              onChange={(e) => {
                const originalRow = rows.find((x) => x.id === id);
                if (!originalRow) return;

                const updatedRow = {
                  ...originalRow,
                  ...editedRows[id],
                  [params.field]: e.target.value,
                } as T;

                setEditedRows((prev) => ({
                  ...prev,
                  [id]: updatedRow,
                }));
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                },
              }}
            />
          );
        }

        if (column.valueFormatter) {
          return column.valueFormatter(params);
        }

        return rowValue;
      },
    })),

    ...(!hideActions
      ? [
        {
          field: "actions",
          headerName: "Acciones",
          width: 140,
          sortable: false,
          filterable: false,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => {
            const id = params.id;
            const row = params.row as T;
            const editing = isRowEditing(id);

            if (editing) {
              return (
                <Box display="flex" gap={1}>
                  <Tooltip title="Guardar">
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => handleSaveClick(id)}
                    >
                      <SaveIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Cancelar">
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleCancelClick(id)}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            }

            return (
              <Box display="flex" gap={1}>
                {!hideEditButton && canEdit && (
                  <Tooltip title="Editar">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}

                {!hideDeleteButton && canDelete && (
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete?.(id, row)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            );
          },
        } as GridColDef<T>,
      ]
      : []),
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "#fff",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        {!hideCreateButton && canCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreate}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {createButtonText}
          </Button>
        )}
      </Box>

      <Box sx={{ height, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={finalColumns}
          disableSelectionOnClick
          getRowHeight={() => "auto"}
          pagination
          pageSize={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            border: "none",

            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "1.2",
              textAlign: "center",
            },

            "& .MuiDataGrid-columnHeader": {
              height: "auto !important",
              alignItems: "center",
              justifyContent: "center",
              py: 1,
            },

            "& .MuiDataGrid-columnHeaders": {
              maxHeight: "168px !important",
            },

            "& .MuiDataGrid-cell": {
              borderColor: "#eef2f7",
              display: "flex",
              alignItems: "center",
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: "1.4 !important",
              py: 1,
            },

            "& .MuiDataGrid-cellContent": {
              whiteSpace: "normal",
              overflow: "visible",
              textOverflow: "unset",
            },

            "& .MuiDataGrid-row": {
              maxHeight: "none !important",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f9fafb",
            },

            "& .MuiInputBase-root": {
              fontSize: "14px",
            },
          }}
        />
      </Box>
    </Paper>
  );
}