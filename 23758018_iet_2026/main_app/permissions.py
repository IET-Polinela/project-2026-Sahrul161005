from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerAndDraftOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        # Semua user login boleh GET
        if request.method in SAFE_METHODS:
            return request.user.is_authenticated

        # Hanya member/citizen boleh POST
        if request.method == 'POST':
            return (
                request.user.is_authenticated
                and request.user.is_member
            )

        # PUT/PATCH/DELETE lanjut ke has_object_permission
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        # GET detail boleh semua user login
        if request.method in SAFE_METHODS:
            return True

        # Edit/Delete:
        # harus pemilik report DAN status masih DRAFT
        return (
            obj.reporter == request.user
            and obj.status == 'DRAFT'
        ) 