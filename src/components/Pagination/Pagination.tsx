import "./index.less";
import { Pagination as AntdPagination } from "antd";

function itemRender(current: any, type: any, originalElement: any) {
  if (type === "prev") {
    return <div className="pagination-pre">上一页</div>;
  }
  if (type === "page") {
    return <div className="pagination-page">{current}</div>;
  }
  if (type === "next") {
    return <div className="pagination-next">下一页</div>;
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
  onChange: () => void;
}) => {
  return (
    <AntdPagination
      defaultCurrent={1}
      pageSize={props.pageSize}
      showSizeChanger={false}
      showTitle={false}
      size="small"
      total={props.total}
      itemRender={itemRender}
      onChange={props.onChange}
    />
  );
};

export default Pagination;
