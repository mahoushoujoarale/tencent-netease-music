import "./index.less";
import { Pagination as AntdPagination } from "antd";

function itemRender(current: number, type: string, originalElement: any) {
  if (type === "prev") {
    return <button className="pagination-pre">上一页</button>;
  }
  if (type === "page") {
    return <div className="pagination-page">{current}</div>;
  }
  if (type === "next") {
    return <button className="pagination-next">下一页</button>;
  }
  if (type === "jump-prev" || type === "jump-next") {
    return (
      <div
        className="pagination-jump"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        ...
      </div>
    );
  }
  return originalElement;
}

const Pagination = (props: {
  pageSize: number;
  total: number;
  current: number;
  onPageChange: (current: number) => void;
}) => {
  return (
    <AntdPagination
      current={props.current}
      pageSize={props.pageSize}
      showSizeChanger={false}
      size="small"
      total={props.total}
      itemRender={itemRender}
      onChange={(current) => {
        props.onPageChange(current);
      }}
    />
  );
};

export default Pagination;
