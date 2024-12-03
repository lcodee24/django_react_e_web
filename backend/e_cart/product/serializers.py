from rest_framework import serializers
from .models import Product


class ProductSerializers(serializers.ModelSerializer):
      image = serializers.SerializerMethodField()

      def get_image(self, obj):
        return obj.image.url

      class Meta:
        model = Product
        fields = "__all__"
        
        