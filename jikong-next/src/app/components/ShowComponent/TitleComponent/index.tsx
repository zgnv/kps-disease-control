// 内容标题部分组件 名字根据传入展示
export default function TitleComponent(props: any) {
  return (
    <div className="w-full h-[80px] bg-[#fff] flex flex-col">
      {props.type === "UserManage" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">用户管理</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">掌管用户管理权限</span>
          </div>
        </>
      )}
      {props.type === "tagManage" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">标签管理</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">掌管标签管理权限</span>
          </div>
        </>
      )}
      {props.type === "PermissionManage" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">权限管理</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">掌管系统角色和权限</span>
          </div>
        </>
      )}
      {props.type === "batchManagment" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">批次号管理</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">管理批次号</span>
          </div>
        </>
      )}
      {props.type === "corpusUpload" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">语料上传</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">语料上传</span>
          </div>
        </>
      )}
      {props.type === "searchRequest" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">检索申请</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">
              通过文件类型、业务类型、标签进行查询和申请
            </span>
          </div>
        </>
      )}
      {props.type === "corpusMaintenance" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">语料维护</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">修改和管理已上传的语料信息</span>
          </div>
        </>
      )}
    </div>
  );
}
