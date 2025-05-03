"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Id } from "../../../convex/_generated/dataModel";

type Category = {
  _id: Id<"categories">;
  name: string;
  _creationTime: number;
};

export function AdminCategoriesTable() {
  const { toast } = useToast();
  const { data, isPending, error } = useQuery(
    convexQuery(api.categories.getAllCategories, {})
  );

  // Setup mutations with the correct pattern
  const { mutate: addCategory, isPending: isAddingCategory } = useMutation({
    mutationFn: useConvexMutation(api.categories.addCategory),
  });

  const { mutate: editCategoryMutation, isPending: isEditingCategory } =
    useMutation({
      mutationFn: useConvexMutation(api.categories.editCategory),
    });

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: useConvexMutation(api.categories.deleteCategory),
    }
  );

  // State for add/edit dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const openAddDialog = () => {
    setEditCategory(null);
    setName("");
    setDialogOpen(true);
  };

  const openEditDialog = (cat: Category) => {
    setEditCategory(cat);
    setName(cat.name);
    setDialogOpen(true);
  };

  const openDeleteDialog = (cat: Category) => {
    setCategoryToDelete(cat);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCategory) {
        await editCategoryMutation({ categoryId: editCategory._id, name });
        toast({ description: "Category updated successfully" });
      } else {
        await addCategory({ name });
        toast({ description: "Category added successfully" });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to save category",
      });
    } finally {
      setDialogOpen(false);
      setName("");
      setEditCategory(null);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      deleteCategory({ categoryId: categoryToDelete._id });
      toast({
        description: "Category deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to delete category",
      });
    } finally {
      setCategoryToDelete(null);
    }
  };

  if (isPending) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (error || !data) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading categories
      </div>
    );
  }

  return (
    <div>
      {/* Add Category Button */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={openAddDialog}
          variant="default"
          size="sm"
          disabled={isAddingCategory}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>{cat?.name}</TableCell>
              <TableCell>
                {cat._creationTime
                  ? new Date(cat._creationTime).toLocaleString()
                  : "-"}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(cat)}
                  disabled={isEditingCategory}
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openDeleteDialog(cat)}
                  disabled={isDeletingCategory}
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              required
              autoFocus
              disabled={isAddingCategory || isEditingCategory}
            />
            <DialogFooter className="gap-2">
              <Button
                type="submit"
                disabled={isAddingCategory || isEditingCategory}
              >
                {editCategory ? "Save Changes" : "Add"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isAddingCategory || isEditingCategory}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open) setCategoryToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category &quot;
              {categoryToDelete?.name}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeletingCategory}
            >
              {isDeletingCategory ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
// Generated by Copilot
