# Other Tips

## Markdown

-       asi se hace una caja en markdown


elemnto 1 | elemento 2 | elemento 3
|---|---|---|

## Git

### Repositorio temporal

- 1 Clona el repositorio en una carpeta temporal.
- 2 Mueve los archivos del repositorio clonado a la ubicación deseada.
- 3 Elimina la carpeta temporal.

```bash
git clone URL_del_repositorio tmp_repo
mv tmp_repo/* .
rm -rf tmp_repo
```

### Git pull especial
Comando para cuando tenemos un repositorio que no tiene un seguimiento y lo queremos subir a continuacion de un repositiorio ya existente
**Ojo, hay que tener commit los archivos**

*Después de ejecutar este comando, Git intentará fusionar las historias de las dos ramas. Sin embargo, ten en cuenta que es posible que tengas que resolver conflictos si existen diferencias significativas entre las ramas.*


```bash
git pull origin main --allow-unrelated-histories
```

### Git restore losed Github remote

```bash
git remote add origin nombre_de_tu_repositorio
```

### Git push new "rama"

*Hacer el add y commit, despues:*

```bash
git checkout -b nombre_de_tu_rama
git push origin nombre_de_tu_rama
```

### Unfollow a Github

*Dejar de seguir al repositorio actual en la nube*

```bash
git remote -v
git remote remove nombre_de_tu_repo(origin ...)
```

