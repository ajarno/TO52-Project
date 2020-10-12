from django.db import models
from django.contrib.auth.models import User

# Define discussion model

class Discussion(models.Model):
    # Foreign keys 
    sender = models.ForeignKey(UserAccount,on_delete=models.CASCADE, related_name='discussion')
    receiver = models.ForeignKey(UserAccount,on_delete=models.CASCADE, related_name='discussion')
    related_ad = models.ForeignKey(Ad,on_delete=models.CASCADE, related_name='ad')
   
    # Inheritance
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    # Attributes
    created_at = models.DateField(auto_now_add=True)
    content = models.TextField(max_length=1500,blank=False)
