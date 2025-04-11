// 内容左侧部分组件 内容根据传入页面类型展示
import CorpusUpload from "@/app/(commonLayout)/CorpusCollect/Upload/page";
import DepComponent from "./DepComponent";
import FileBusiComponent from "./FileBusiComponent";
import RoleComponent from "./RoleComponent";
import BatchTable from "@/app/(commonLayout)/CorpusCollect/Batch/batchTable";
export default function LeftComponent(props: any) {
  return (
    <div className="w-[300px] flex flex-col p-[16px] gap-4 border-r-[1px] border-slate-300">
      {props.type === "UserManage" && <DepComponent />}
      {props.type === "tagManage" && <FileBusiComponent />}
      {props.type === "PermissionManage" && <RoleComponent />}
      {props.type === "batchManagment" && <BatchTable />}
      {props.type === "corpusUpload" && <CorpusUpload />}
    </div>
  );
}
