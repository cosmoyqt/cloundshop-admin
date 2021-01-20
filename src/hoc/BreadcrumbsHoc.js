import { matchPath } from 'react-router';

const flattenRoutes = arr =>
arr.reduce(function(prev, item) {
  return prev.concat(
    Array.isArray(item.children) ? flattenRoutes(item.children) : item
  );
}, []);
const getBreadcrumb = ({ list, curSection, pathSection }) => {
  const matchRoute = list.find(ele => {
  
    const { path } = ele;
    if (!path) {
      throw new Error(
        'Router中的每一个route必须包含 `path` 以及 `breadcrumb` 属性'
      );
    }
    // 查找是否有匹配
    // exact 为 react router4 的属性，用于精确匹配路由
    return matchPath(pathSection, { path, exact: true });
  });

  // 返回breadcrumb的值，没有就返回原匹配子路径名
  if (matchRoute) {
    return ({
      content: matchRoute.title || curSection,
      path: matchRoute.path,
    });
  }

  // 对于routes表中不存在的路径
  // 根目录默认名称为首页.
  return ({
    content: pathSection === '/admin' ? '首页' : curSection,
    path: pathSection,
  });
};
export const getBreadcrumbs = ({ routerList, location }) => {
  // 初始化匹配数组match
  let matches = [];
  let list = flattenRoutes(routerList);
  location.pathname
    // 取得路径名，然后将路径分割成每一路由部分.
    .split('?')[0]
    .split('/')
    // 对每一部分执行一次调用`getBreadcrumb()`的reduce.
    .reduce((prev, curSection) => {
      // 将最后一个路由部分与当前部分合并，比如当路径为 `/x/xx/xxx` 时，pathSection分别检查 `/x` `/x/xx` `/x/xx/xxx` 的匹配，并分别生成面包屑
      const pathSection = `${prev}/${curSection}`;
      const breadcrumb = getBreadcrumb({
        list,
        curSection,
        pathSection,
      });

      // 将面包屑导入到matches数组中
      matches.push(breadcrumb);

      // 传递给下一次reduce的路径部分
      return pathSection;
    });
  return matches;
};
