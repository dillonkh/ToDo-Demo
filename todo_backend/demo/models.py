from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (User)


class ToDoItem(models.Model):

    class PossibleToDoStatus(models.TextChoices):
        IN_PROGRESS = 'IP', _('In Progress')
        COMPLETE = 'C', _('Complete')
        TODO = 'TD', _('To Do')
        PAST_DUE = 'PD', _('Past Due')

    description = models.CharField(
        _("description"),
        max_length=500,
        unique=False,
        help_text=_(
            "Required. 500 characters or fewer."
        )
    )
    status = models.CharField(
        max_length=25,
        choices=PossibleToDoStatus.choices,
        default=PossibleToDoStatus.TODO,
    )
    todo_by = models.DateTimeField(_("todo by date"), null=True)
    completed_at = models.DateTimeField(_("completed at date"), null=True)
    created_ts = models.DateTimeField(auto_now_add=True)
    updated_ts = models.DateTimeField(auto_now=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("task")
        verbose_name_plural = _("tasks")
        abstract = False