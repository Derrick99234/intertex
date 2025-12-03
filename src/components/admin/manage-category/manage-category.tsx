"use client";

import { useState, useEffect, useCallback, FormEvent, useMemo } from "react";
import {
  Edit,
  Trash2,
  PlusCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  List,
  Tag,
  HardHat,
} from "lucide-react";
import {
  createCategory,
  createProductType,
  createSubCategory,
  deleteCategory,
  deleteProductType,
  deleteSubCategory,
  getAllProductTypes,
  getAllSubCategories,
  getCategories,
  updateCategory,
  updateProductType,
  updateSubCategory,
} from "@/lib/fetchCategories";
import DeletePopup from "../blog/delete-popup";

// --- Simple Modal Component (Self-Contained Fix for Import Error) ---
interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close modal"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
// --- END Simple Modal Component ---

// --- 1. Data Models (Types) ---
interface BaseEntity {
  _id: string;
  name: string;
  description: string;
  slug?: string;
  status: boolean;
}

type Category = BaseEntity;

interface Subcategory extends BaseEntity {
  category: Category; // ID of parent Category
  categoryName?: string;
}

interface ProductType extends BaseEntity {
  totalProducts?: number;
  totalSold?: number;
  subcategory: Subcategory; // ID of parent Subcategory
  subcategoryName?: string;
}

type EntityType = "categories" | "subcategories" | "productTypes";

// --- 2. Mock API Service (For Demonstration) ---

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));
const getSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

// // Function to simulate saving (create/update) for any entity type
async function saveEntity(type: EntityType, data: any): Promise<any> {
  await delay();

  const isUpdate = !!data._id;
  const slug = getSlug(data.name);

  if (isUpdate) {
    console.log(data);
    const res =
      type === "categories"
        ? updateCategory(data._id, {
            name: data.name,
            slug,
            description: data.description,
            status: data.status,
          })
        : type === "subcategories"
        ? updateSubCategory(data._id, {
            name: data.name,
            slug,
            description: data.description,
            status: data.status,
          })
        : type === "productTypes"
        ? updateProductType(data._id, {
            name: data.name,
            slug,
            description: data.description,
            status: data.status,
            subcategory: data.subcategory?._id || data.subcategory,
          })
        : console.log("update product type");

    return res;
  } else {
    const newItem = {
      ...data,
      slug,
      status: data.status ?? true,
    };
    const res =
      type === "categories"
        ? createCategory({
            name: data.name,
            description: data.description,
            status: data.status,
          })
        : type === "subcategories"
        ? createSubCategory({
            name: data.name,
            description: data.description,
            status: data.status,
            category: data.category,
          })
        : type === "productTypes"
        ? createProductType({
            name: data.name,
            description: data.description,
            status: data.status,
            subcategory: data.subcategory,
          })
        : console.log("Create product type");

    return res;
  }
}

// // Function to simulate deletion (with cascade for Categories/Subcategories)
async function deleteEntity(type: EntityType, id: string): Promise<void> {
  await delay();

  if (type === "categories") {
    deleteCategory(id);
  } else if (type === "subcategories") {
    deleteSubCategory(id);
  } else if (type === "productTypes") {
    deleteProductType(id);
  }
}

// --- 3. Data Context & Fetching Hook ---

type ManagementData = {
  categories: Category[];
  subcategories: Subcategory[];
  productTypes: ProductType[];
  isLoading: boolean;
  refreshData: () => void;
  // refreshData: () => Promise<void>;
};

function useManagementData(): ManagementData {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await delay(500);
      const categories = await getCategories();
      const subcategories = await getAllSubCategories();
      const { data: productTypes } = await getAllProductTypes();
      setCategories(categories);
      setSubcategories(subcategories);
      setProductTypes(productTypes);
    } catch (error) {
      console.error("Failed to fetch management data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const refreshData = useCallback(() => {
    fetchData();
  }, []);
  useEffect(() => {
    refreshData();
  }, []);

  return { categories, subcategories, productTypes, isLoading, refreshData };
}

// --- 4. Reusable UI Components ---

type ColumnKey =
  | keyof BaseEntity
  | "categoryName"
  | "subcategoryName"
  | "totalProducts";

interface EntityTableProps<T> {
  title: string;
  data: T[];
  columns: { key: ColumnKey; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const getCellValue = <T,>(item: T, key: keyof T | string): React.ReactNode => {
  if (key === "status") {
    const status = (item as any)["status"];
    return (
      <span
        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
          status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {status ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <XCircle className="w-3 h-3 mr-1" />
        )}
        {status ? "Active" : "Inactive"}
      </span>
    );
  }
  if (key === "description") {
    const desc = (item as any)["description"] as string;
    return desc.length > 50 ? desc.slice(0, 50) + "..." : desc;
  }

  if (key === "categoryName") {
    const cat = (item as any)["category"] as Category;
    return cat ? cat.name : "N/A";
  }

  if (key === "subcategoryName") {
    const sub = (item as any)["subcategory"] as Subcategory;
    return sub ? sub.name : "N/A";
  }

  return (item as any)[key] as React.ReactNode;
};

function EntityTable<T extends BaseEntity>({
  title,
  data,
  columns,
  onEdit,
  onDelete,
  isLoading,
}: EntityTableProps<T>) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteClick = async (id: string) => {
    setDeletingId(id);
    try {
      onDelete(id);
    } catch (error) {
      console.error("Delete failed:", error);
      console.error("Delete failed. Check console for details.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading {title}...</div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto min-h-[400px]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-8 text-center text-gray-500"
              >
                No {title} found. Click &apos;Add New&apos; to create one.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {getCellValue(item, col.key as string)}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-100 transition-colors"
                    aria-label="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id)}
                    disabled={deletingId === item._id}
                    className={`text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors ${
                      deletingId === item._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    aria-label="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// --- 5. Entity Forms ---

interface GenericFormProps {
  entityType: EntityType;
  initialData: any;
  categories: Category[];
  subcategories: Subcategory[];
  onSuccess: () => void;
  onCancel: () => void;
}

const GenericForm = ({
  entityType,
  initialData,
  categories,
  subcategories,
  onSuccess,
  onCancel,
}: GenericFormProps) => {
  const isEditing = !!initialData?._id;
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status ?? true);
  const [parentId, setParentId] = useState(
    initialData?.category || initialData?.subcategory || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set initial parent ID based on entity type and available data
    if (!isEditing && entityType !== "categories") {
      if (entityType === "subcategories" && categories.length > 0) {
        setParentId(categories[0]._id);
      } else if (entityType === "productTypes" && subcategories.length > 0) {
        setParentId(subcategories[0]._id);
      }
    }
  }, [isEditing, entityType, categories, subcategories]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const baseData = { name, description, status };
    const data: any = { ...baseData };

    if (entityType !== "categories" && !parentId) {
      setError(
        `Please select a parent ${
          entityType === "subcategories" ? "category" : "subcategory"
        }.`
      );
      setLoading(false);
      return;
    }

    if (isEditing) data._id = initialData._id;

    if (entityType === "subcategories") {
      data.category = parentId;
    } else if (entityType === "productTypes") {
      data.subcategory = parentId;
    }

    try {
      await saveEntity(entityType, data);
      onSuccess();
    } catch (err: any) {
      setError(
        err.message ||
          `Failed to ${isEditing ? "update" : "create"} ${entityType.slice(
            0,
            -1
          )}.`
      );
    } finally {
      setLoading(false);
    }
  };

  const parentOptions = useMemo(() => {
    if (entityType === "subcategories") return categories;
    if (entityType === "productTypes") return subcategories;
    return [];
  }, [entityType, categories, subcategories]);

  const parentLabel =
    entityType === "subcategories" ? "Parent Category" : "Parent Subcategory";
  const parentKey = entityType === "subcategories" ? "category" : "subcategory";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h4 className="text-xl font-semibold text-gray-800 capitalize">
        {isEditing ? "Edit" : "Create New"} {entityType.slice(0, -1)}
      </h4>
      {error && (
        <p className="text-red-500 bg-red-100 p-2 rounded-lg">{error}</p>
      )}

      {/* Parent Selector (Conditional) */}
      {entityType !== "categories" && (
        <div className="relative">
          <label
            htmlFor={parentKey}
            className="block text-sm font-medium text-gray-700"
          >
            {parentLabel}
          </label>
          <select
            id={parentKey}
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10"
            disabled={parentOptions.length === 0}
          >
            {parentOptions.length === 0 && (
              <option value="">No {parentLabel} Available</option>
            )}
            {parentOptions.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
                {entityType === "productTypes" &&
                  (p as Subcategory).categoryName &&
                  ` (Cat: ${(p as Subcategory).categoryName})`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-[calc(1.75rem+4px)] pointer-events-none" />
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Status */}
      <div className="flex items-center pt-2">
        <input
          id="status"
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="status" className="ml-3 block text-base text-gray-900">
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={
            loading ||
            (entityType !== "categories" && parentOptions.length === 0)
          }
          className={`px-5 py-2 rounded-lg text-white font-semibold transition-colors shadow-md ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading
            ? "Saving..."
            : isEditing
            ? `Update ${entityType.slice(0, -1)}`
            : `Create ${entityType.slice(0, -1)}`}
        </button>
      </div>
    </form>
  );
};

type TabConfig = {
  label: string;
  icon: any;
  columns: { key: ColumnKey; label: string }[];
};

const tabConfigs: Record<EntityType, TabConfig> = {
  categories: {
    label: "Categories",
    icon: List,
    columns: [
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "status", label: "Status" },
    ],
  },
  subcategories: {
    label: "Subcategories",
    icon: HardHat,
    columns: [
      { key: "name", label: "Name" },
      { key: "categoryName", label: "Parent Category" },
      { key: "description", label: "Description" },
      { key: "status", label: "Status" },
    ],
  },
  productTypes: {
    label: "Product Types",
    icon: Tag,
    columns: [
      { key: "name", label: "Name" },
      { key: "subcategoryName", label: "Parent Subcategory" },
      { key: "description", label: "Description" },
      { key: "totalProducts", label: "Products Count" },
      { key: "status", label: "Status" },
    ],
  },
};

export default function AdminManagementPageProp() {
  const { categories, subcategories, productTypes, isLoading, refreshData } =
    useManagementData();
  const [activeTab, setActiveTab] = useState<EntityType>("categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<any>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState("");

  const handleCreate = () => {
    setEditingEntity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (entity: any) => {
    setEditingEntity(entity);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteEntity(activeTab, id);
    refreshData();
  };

  const handleSuccess = () => {
    refreshData();
    setIsModalOpen(false);
  };

  const currentConfig = tabConfigs[activeTab];
  const currentData = {
    categories,
    subcategories,
    productTypes,
  }[activeTab];

  const parentDependenciesMissing = useMemo(() => {
    if (activeTab === "subcategories" && categories.length === 0)
      return "category";
    if (activeTab === "productTypes" && subcategories.length === 0)
      return "subcategory";
    return null;
  }, [activeTab, categories.length, subcategories.length]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans antialiased">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Manage Category
      </h1>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        {Object.entries(tabConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as EntityType)}
            className={`flex items-center px-6 py-3 text-lg font-medium transition-colors border-b-4 ${
              activeTab === key
                ? "text-indigo-600 border-indigo-600 bg-indigo-50"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <config.icon className="w-5 h-5 mr-2" />
            {config.label}
          </button>
        ))}
      </div>

      {/* Header and Create Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentConfig.label} List
        </h2>
        <button
          onClick={handleCreate}
          disabled={!!parentDependenciesMissing}
          title={
            parentDependenciesMissing
              ? `Please create a parent ${parentDependenciesMissing} first.`
              : `Add New ${currentConfig.label.slice(0, -1)}`
          }
          className={`px-5 py-2 text-white rounded-xl transition-all flex items-center shadow-lg font-medium ${
            parentDependenciesMissing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
          }`}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New {currentConfig.label.slice(0, -1)}
        </button>
      </div>

      {/* Display Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600">Loading management data...</p>
        </div>
      ) : (
        <EntityTable
          title={currentConfig.label}
          data={currentData}
          columns={currentConfig.columns}
          onEdit={handleEdit}
          onDelete={(id) => {
            setDeleteItemId(id);
            setShowDeletePopup(true);
          }}
          isLoading={isLoading}
        />
      )}

      {/* Modal for Forms */}
      {isModalOpen && (
        <Modal
          title={`${
            editingEntity ? "Edit" : "Create"
          } ${currentConfig.label.slice(0, -1)}`}
          onClose={() => setIsModalOpen(false)}
        >
          <GenericForm
            entityType={activeTab}
            initialData={editingEntity}
            categories={categories}
            subcategories={subcategories}
            onSuccess={handleSuccess}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
      {showDeletePopup && (
        <DeletePopup
          title="Confirm Delete"
          text="Are you sure you want to delete this item? This action cannot be undone."
          onClose={() => setShowDeletePopup(false)}
          onDelete={() => {
            handleDelete(deleteItemId);
            setShowDeletePopup(false);
          }}
        />
      )}
    </div>
  );
}
