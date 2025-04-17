/**
 *
 * @param {string} moduleName
 * @returns {string}
 */
export const routeComponentStub = (moduleName) => `import { lazy } from "react";
import { Routes, Route } from "react-router-dom";  

export default function ${moduleName}Routes() {  
    return (  
        <Routes></Routes>   
    );  
};  
`;

/**
 * @param {string} pageName
 * @param {string} pagePath
 * @param {string} moduleName - The name of the module (in the format "w/w1/w2/w3").
 * @returns {string}
 */
export const pageComponentStub = (
  pageName,
  pagePath,
  moduleName
) => `import use${pageName} from "@/modules/${moduleName}/hooks/${pagePath}";

export default function ${pageName}() {
  const {} = use${pageName}();
  return (
    <div></div>
  )
}`;

/**
 * @param {string} pageName
 * @param {string} pagePath
 * @param {string} moduleName - The name of the module (in the format "w/w1/w2/w3").
 * @returns {string}
 */
export const hookComponentStub = (pageName, pagePath, moduleName) => {
  const paramsString = '${params ? `?${params}` : ""}';
  return `import useFetch from "@/common/hooks/APi/Fetch/useFetch";
import { useFilter } from "@/common/hooks/APi/Filter/useFilter";
import { ${pageName}Interface } from "@/modules/${moduleName}/types/${pagePath}";

export default function use${pageName}() {
  const { searchParams } = useFilter();
  const params = searchParams.toString();
  const { data, isLoading } = useFetch<${pageName}Interface>({
    url: \`${pageName.toLowerCase()}${paramsString}\`,  
    key: \`${pageName.toLowerCase()}${paramsString}\`,  
  });

  return { data, isLoading };
}`;
};

/**
 * @param {string} pageName
 * @returns {string}
 */
export const typeStub = (pageName) =>
  `export interface ${pageName}Interface {}`;
