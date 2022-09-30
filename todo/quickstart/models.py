from django.db import models
from django.utils.translation import gettext_lazy as _

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
    todo_by = models.DateTimeField(_("todo by date"))
    completed_at = models.DateTimeField(_("completed at date"))
    created_ts = models.DateTimeField(auto_now_add=True)
    updated_ts = models.DateTimeField(auto_now=True)

    # EMAIL_FIELD = "email"
    # USERNAME_FIELD = "username"
    # REQUIRED_FIELDS = ["email"]

    class Meta:
        verbose_name = _("task")
        verbose_name_plural = _("tasks")
        abstract = False

    # def clean(self):
    #     super().clean()
    #     self.email = self.__class__.objects.normalize_email(self.email)

    # def get_full_name(self):
    #     """
    #     Return the first_name plus the last_name, with a space in between.
    #     """
    #     full_name = "%s %s" % (self.first_name, self.last_name)
    #     return full_name.strip()

    # def get_short_name(self):
    #     """Return the short name for the user."""
    #     return self.first_name

    # def email_user(self, subject, message, from_email=None, **kwargs):
    #     """Send an email to this user."""
    #     send_mail(subject, message, from_email, [self.email], **kwargs)
