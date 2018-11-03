
import * as React from 'react';

type AlertLevel = | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

interface IProps {
  level?: AlertLevel;
  message: string;
}

export default function Alert(props: IProps) {
  const { message } = props;
  const level: AlertLevel = props.level || 'primary';
  const blockClassName = `alert alert-${level} alert-dismissible fade show`;
  return (
    <div className={blockClassName} role="alert">
      {message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
