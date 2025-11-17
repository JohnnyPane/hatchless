class AddFullTextSearchToResources < ActiveRecord::Migration[8.0]
  def change
    remove_index :fly_patterns, :name if index_exists?(:fly_patterns, :name)
    add_column :fly_patterns, :name_vector, :tsvector, as: "to_tsvector('simple', coalesce(name, ''))", stored: true
    add_index :fly_patterns, :name_vector, using: :gin

    remove_index :insects, :common_name if index_exists?(:insects, :common_name)
    add_column :insects, :common_name_vector, :tsvector, as: "to_tsvector('simple', coalesce(common_name, ''))", stored: true
    add_index :insects, :common_name_vector, using: :gin

    remove_index :fish, :common_name if index_exists?(:fish, :common_name)
    add_column :fish, :common_name_vector, :tsvector, as: "to_tsvector('simple', coalesce(common_name, ''))", stored: true
    add_index :fish, :common_name_vector, using: :gin

    remove_index :fly_shops, :name if index_exists?(:fly_shops, :name)
    add_column :fly_shops, :name_vector, :tsvector, as: "to_tsvector('simple', coalesce(name, ''))", stored: true
    add_index :fly_shops, :name_vector, using: :gin

    remove_index :rivers, :name if index_exists?(:rivers, :name)
    add_column :rivers, :name_vector, :tsvector, as: "to_tsvector('simple', coalesce(name, ''))", stored: true
    add_index :rivers, :name_vector, using: :gin
  end
end
