import { useMemo, useState } from "react";  
import { DropDownList } from "@progress/kendo-react-dropdowns";  
  
// Dropdown categories  
const categories = ["All", "Trade: Settled", "Trade: Pending", "Bond: Active", "Bond: Nearing", "Bond: Post Maturity", "Bond: Settled"];  

  
export const FilterDropDownList = (props) => {  
  return (
    <section className="k-my-8">
      <form className="k-form k-mb-4">
        <label className="k-label k-mb-3">Category</label><p></p>
        <DropDownList data={categories} onChange={e => props.setCategory(e.value)} style={{cursor: "pointer"}}/>
      </form>
    </section>
  );
};