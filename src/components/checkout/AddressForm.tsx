import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AddressData {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

interface AddressFormProps {
  address: AddressData;
  onChange: (address: AddressData) => void;
  showEmail?: boolean;
}

const nepalCities = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Biratnagar",
  "Birgunj",
  "Bharatpur",
  "Dharan",
  "Butwal",
  "Hetauda",
];

const nepalStates = [
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Koshi Province",
  "Madhesh Province",
  "Sudurpashchim Province",
  "Karnali Province",
];

export function AddressForm({ address, onChange, showEmail = true }: AddressFormProps) {
  const updateField = (field: keyof AddressData, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={address.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={address.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+977 98XXXXXXXX"
          />
        </div>
      </div>

      {showEmail && (
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={address.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your@email.com"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="addressLine1">Street Address *</Label>
        <Input
          id="addressLine1"
          value={address.addressLine1}
          onChange={(e) => updateField("addressLine1", e.target.value)}
          placeholder="House/Building number, Street name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine2">Apartment, Suite, etc. (optional)</Label>
        <Input
          id="addressLine2"
          value={address.addressLine2}
          onChange={(e) => updateField("addressLine2", e.target.value)}
          placeholder="Apartment, suite, unit, floor, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Select
            value={address.city}
            onValueChange={(value) => updateField("city", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {nepalCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Province *</Label>
          <Select
            value={address.state}
            onValueChange={(value) => updateField("state", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              {nepalStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={address.postalCode}
            onChange={(e) => updateField("postalCode", e.target.value)}
            placeholder="44600"
          />
        </div>
      </div>
    </div>
  );
}
