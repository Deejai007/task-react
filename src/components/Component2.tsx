import React, { useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

interface Department {
  department: string;
  sub_departments: string[];
}
interface Department {
  department: string;
  sub_departments: string[];
}

const departments: Department[] = [
  {
    department: "Customer service",
    sub_departments: ["Support", "Customer success"],
  },
  {
    department: "Design",
    sub_departments: ["Graphic design", "Product design", "Web design"],
  },
];

const Component2: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpanded((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]
    );
  };

  const handleSelect = (
    name: string,
    isSubDept: boolean,
    parentName?: string
  ) => {
    setSelected((prev) => {
      let newSelected = [...prev];

      //unselect
      if (newSelected.includes(name)) {
        // if department unselected
        if (!isSubDept) {
          // remove from the newSelected
          newSelected = newSelected.filter((item) => item !== name);
          // find subdepartments of the department
          const subDeptNames =
            departments.find((d) => d.department === name)?.sub_departments ||
            [];
          // remove all subdepartments of the department from newSelected
          newSelected = newSelected.filter(
            (item) => !subDeptNames.includes(item)
          );
        } else {
          // remove
          newSelected = newSelected.filter((item) => item !== name);
        }
      }
      // select
      else {
        newSelected.push(name);
        // case of parent
        if (!isSubDept) {
          const dept = departments.find((d) => d.department === name);
          // add all subdepartments of the selected department to the newSelected
          newSelected = newSelected.concat(dept?.sub_departments ?? []);
        }
      }
      // handle cases 1. all subdeps selected- then select the parent department 2. if any one subdep is unselected, unselect the parent department
      if (isSubDept && parentName) {
        const parentDept = departments.find((d) => d.department === parentName);
        if (parentDept) {
          // find which subdepartments are selected
          const allSubDeptsSelected = parentDept.sub_departments.every((sd) =>
            newSelected.includes(sd)
          );
          // if all are selected, select the parent department too
          if (allSubDeptsSelected) {
            newSelected.push(parentName);
          } else {
            // else unselect the parent department
            newSelected = newSelected.filter((item) => item !== parentName);
          }
        }
      }
      return newSelected;
    });
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundColor: "rgb(250 250 250 )",
        borderRadius: "8px",
        padding: "20px",
        minHeight: "40vh",
        margin: "32px auto",
        fontSize: "1.25em",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography align="center" variant="h4" marginBottom="8px">
        {" "}
        List of Departments
      </Typography>
      {departments.map((department) => (
        <div key={department.department}>
          <div>
            <span
              onClick={() => toggleExpand(department.department)}
              style={{
                padding: "4px",
                fontSize: "2em",
                cursor: "default",
                fontFamily: "monospace",
              }}
            >
              {expanded.includes(department.department) ? "-" : "+"}
            </span>
            <input
              type="checkbox"
              style={{ margin: "4px" }}
              checked={selected.includes(department.department)}
              onChange={() => handleSelect(department.department, false)}
            />
            {department.department}
            <span style={{ color: "gray", fontSize: "0.75em" }}>
              &nbsp; ({department.sub_departments.length})
            </span>
          </div>
          {expanded.includes(department.department) && (
            <div style={{ paddingLeft: "20px" }}>
              {department.sub_departments.map((subDepartment) => (
                <div key={subDepartment}>
                  <input
                    style={{ margin: "4px", marginLeft: "18px" }}
                    type="checkbox"
                    checked={selected.includes(subDepartment)}
                    onChange={() =>
                      handleSelect(subDepartment, true, department.department)
                    }
                  />
                  {subDepartment}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </Container>
  );
};

export default Component2;
