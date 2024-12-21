import AddressForm from "@/components/AddressForm";
import SelectAddress from "@/components/SelectAddress";

const page = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <AddressForm />
        <SelectAddress />
      </div>
    </>
  );
};

export default page;
