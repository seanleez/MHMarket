import { IconButton } from '@mui/material';
import DeleteIcon from '../assets/icon/delete-icon.svg';
import EditIcon from '../assets/icon/edit-icon.svg';
import ViewIcon from '../assets/icon/view-icon.svg';
import { LEASE_MANAGEMENT, VIEW_APPLICATION_LIST } from '../const/const';

export default function getListActionsByTableName(
  id: string,
  tableName: string,
  isHavePmsEdit: boolean,
  isHavePmsDelete: boolean,
  onEdit: ((id: string) => void) | undefined,
  onDelete: ((id: string) => void) | undefined,
  onView: ((id: string) => void) | undefined
) {
  switch (tableName) {
    case LEASE_MANAGEMENT:
      return (
        <>
          <IconButton onClick={() => onView?.(id)}>
            <img src={ViewIcon} alt={ViewIcon} />
          </IconButton>
        </>
      );

    case VIEW_APPLICATION_LIST:
      return (
        <>
          <IconButton onClick={() => onView?.(id)}>
            <img src={ViewIcon} alt={ViewIcon} />
          </IconButton>
          <IconButton onClick={() => onEdit?.(id)}>
            <img src={EditIcon} alt={EditIcon} />
          </IconButton>
          <IconButton onClick={() => onDelete?.(id)}>
            <img src={DeleteIcon} alt={DeleteIcon} />
          </IconButton>
        </>
      );

    default:
      return (
        <>
          {isHavePmsEdit && (
            <IconButton onClick={() => onEdit?.(id)}>
              <img src={EditIcon} alt={EditIcon} />
            </IconButton>
          )}
          {isHavePmsDelete && (
            <IconButton onClick={() => onDelete?.(id)}>
              <img src={DeleteIcon} alt={DeleteIcon} />
            </IconButton>
          )}
        </>
      );
  }
}
