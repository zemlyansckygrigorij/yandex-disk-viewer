
import * as React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

export interface ICrumbItem {
  name: string;
  path: string;
}

function mapItem(item: ICrumbItem, index: number, items: ICrumbItem[]) {
  const isLast = index === items.length - 1;
  return (
    <li className={`breadcrumb-item ${!isLast && 'active'}`} key={item.path}>
      {isLast ? item.name : <Link to={item.path}>{item.name}</Link>}
    </li>
  );
}

interface IProps {
  items: ICrumbItem[];
}

export default function Breadcrumb({ items }: IProps) {
  return (
    <nav>
      <ol className="breadcrumb">{items.map(mapItem)}</ol>
    </nav>
  );
}
