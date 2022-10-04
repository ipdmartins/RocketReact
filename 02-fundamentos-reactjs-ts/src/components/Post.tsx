import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface PostProps {
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: string;
  content: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Post bacana heim!"]);
  const [newCommentText, setNewCommentText] = useState("");
  const isNewCommentEmpty = newCommentText.length === 0;

  const publishedDateFormated = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  //FormEvent, quando o evento for disparado pelo formulario
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  //FormEvent, evento disparado nao pelo form, mas pelo campos dele (generics)
  function handleCommentNewChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentValid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo não é valido");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormated}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((conteudo) => {
          if (conteudo.type === "paragraph") {
            return <p key={conteudo.content}>{conteudo.content}</p>;
          } else if (conteudo.type === "paragraph") {
            return (
              <p key={conteudo.content}>
                👉 <a href="#">{conteudo.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleCommentNewChange}
          required
          onInvalid={handleNewCommentValid}
        ></textarea>
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
